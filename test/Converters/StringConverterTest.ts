import test from "ava";
import StringConverter from "../../src/Converters/StringConverter";

test("StringConverter should convert collectly", t => {
  t.truthy(StringConverter("HELLO") === "HELLO");
  t.truthy(StringConverter(null) === null);
  t.truthy(StringConverter(123) === "123");
  t.truthy(StringConverter({ toString: () => "value" }) === "value");
});
