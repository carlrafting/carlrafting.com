const path = "/sw.js";
const scope = "/";
export const register = async () => {
  if (navigator?.serviceWorker) {
    try {
      const registration = await navigator.serviceWorker.register(path, {
        scope,
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
