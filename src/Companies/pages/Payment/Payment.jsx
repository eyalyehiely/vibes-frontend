import React, { useState, useEffect } from "react";
import CompanyDefaultLayout from "../../components/CompanyDefaultLayout";
import Rights from "../../../components/Rights";
import checkCompanyToken from "../../functions/auth/checkCompanyToken";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

function Payment() {
  checkCompanyToken();
  return (
    <CompanyDefaultLayout>
      <Breadcrumb pageName="Payment" />
      <Rights />
    </CompanyDefaultLayout>
  );
}

export default Payment;
