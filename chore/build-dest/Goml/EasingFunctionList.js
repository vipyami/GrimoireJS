/**
 * Easing function classes constructors is listed below.
 * If you extend this hash, the user can use new easing functions.
 * Each easing function class must extends EasingFunctionBase class.
 */
import LinearEasingFunction from "./Easing/LinearEasingFunction";
import SwingEasingFunction from "./Easing/SwingEasingFunction";
const easingFunction = {
    "linear": LinearEasingFunction,
    "swing": SwingEasingFunction,
};
export default easingFunction;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdvbWwvRWFzaW5nRnVuY3Rpb25MaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7T0FFSyxvQkFBb0IsTUFBTSwrQkFBK0I7T0FDekQsbUJBQW1CLE1BQU0sOEJBQThCO0FBRS9ELE1BQU0sY0FBYyxHQUFHO0lBQ3JCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsT0FBTyxFQUFFLG1CQUFtQjtDQUM3QixDQUFDO0FBQ0YsZUFBZSxjQUFjLENBQUMiLCJmaWxlIjoiR29tbC9FYXNpbmdGdW5jdGlvbkxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVhc2luZyBmdW5jdGlvbiBjbGFzc2VzIGNvbnN0cnVjdG9ycyBpcyBsaXN0ZWQgYmVsb3cuXG4gKiBJZiB5b3UgZXh0ZW5kIHRoaXMgaGFzaCwgdGhlIHVzZXIgY2FuIHVzZSBuZXcgZWFzaW5nIGZ1bmN0aW9ucy5cbiAqIEVhY2ggZWFzaW5nIGZ1bmN0aW9uIGNsYXNzIG11c3QgZXh0ZW5kcyBFYXNpbmdGdW5jdGlvbkJhc2UgY2xhc3MuXG4gKi9cblxuIGltcG9ydCBMaW5lYXJFYXNpbmdGdW5jdGlvbiBmcm9tIFwiLi9FYXNpbmcvTGluZWFyRWFzaW5nRnVuY3Rpb25cIjtcbiBpbXBvcnQgU3dpbmdFYXNpbmdGdW5jdGlvbiBmcm9tIFwiLi9FYXNpbmcvU3dpbmdFYXNpbmdGdW5jdGlvblwiO1xuXG5jb25zdCBlYXNpbmdGdW5jdGlvbiA9IHtcbiAgXCJsaW5lYXJcIjogTGluZWFyRWFzaW5nRnVuY3Rpb24sXG4gIFwic3dpbmdcIjogU3dpbmdFYXNpbmdGdW5jdGlvbixcbn07XG5leHBvcnQgZGVmYXVsdCBlYXNpbmdGdW5jdGlvbjtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==