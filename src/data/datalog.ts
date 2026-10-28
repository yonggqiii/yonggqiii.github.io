export type Fact = {
  predicate: "edge" | "path";
  source: string;
  target: string;
};

export const inputFacts: Fact[] = [
  { predicate: "edge", source: "a", target: "b" },
  { predicate: "edge", source: "b", target: "c" },
  { predicate: "edge", source: "c", target: "d" },
];

export function formatFact(fact: Fact) {
  return `${fact.predicate}(${fact.source}, ${fact.target})`;
}

export function deriveFacts(previous: Fact[]): Fact[] {
  const known = new Map(previous.map(fact => [formatFact(fact), fact]));
  const addFact = (fact: Fact) => known.set(formatFact(fact), fact);
  const edges = previous.filter(fact => fact.predicate === "edge");
  const paths = previous.filter(fact => fact.predicate === "path");

  inputFacts.forEach(addFact);
  edges.forEach(edge => addFact({ ...edge, predicate: "path" }));

  for (const path of paths) {
    for (const edge of edges) {
      if (path.target === edge.source) {
        addFact({ predicate: "path", source: path.source, target: edge.target });
      }
    }
  }

  return [...known.values()];
}
