const compose =
  (...fns) =>
  (entry) =>
    fns.reduceRight((next, fn) => fn(next), entry);

const normalizeEvent = (next) => (input) => {
  console.log("Normalizing event");
  return next(input);
};

const logs = (next) => (input) => {
  console.log("Attach log handling");
  const res = next(input);
  res.logs = [{ message: "some log message" }]
  return res;
};

const errorHandler = (next) => (input) => {
  console.log("Attach error handler");
  return next(input);
};

const handler = compose(
  normalizeEvent,
  logs,
  errorHandler
)((context) => {
  console.log("Main handler", context);
  return { statusCode: 200, body: { hello: "world" } };
});

const response = handler({ test: "event" });
console.log("Response", response);
