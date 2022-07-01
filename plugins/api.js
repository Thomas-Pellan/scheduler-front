import Actuator from "@/api/actuator";

export default (context, inject) => {

  const factories = {
    actuator: Actuator(context.$axios),
  };

  inject("api", factories);
};
