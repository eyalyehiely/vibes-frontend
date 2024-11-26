import React, { useState, useEffect } from "react";
import CompanyDefaultLayout from "../../components/CompanyDefaultLayout";
import Rights from "../../../components/Rights";

import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

function Payment() {

  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Payment" />
      <Rights />
    </CompanyDefaultLayout>
  );
}

export default Payment;
