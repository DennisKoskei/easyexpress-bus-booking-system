import React from "react";
import { STRINGS } from "@constants/strings";

const Support = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Support</h2>
      <p className="text-gray-700">
        If you need assistance, please contact our support team at{" "}
        <span className="text-blue-500">{STRINGS.customerSupport.email}</span>{" "}
        or call{" "}
        <span className="text-blue-500">{STRINGS.customerSupport.phone}</span>.
      </p>
    </section>
  );
};

export default Support;
