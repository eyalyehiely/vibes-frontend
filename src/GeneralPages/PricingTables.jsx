import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PricingTableOne from '../components/PricingTables/PricingTableOne';
import PricingTableTwo from '../components/PricingTables/PricingTableTwo';
import DefaultLayout from '../GeneralPages/DefaultLayout';

const PricingTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Pricing Table" />

      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <PricingTableOne />
        <PricingTableTwo />
      </div>
    </DefaultLayout>
  );
};

export default PricingTables;
