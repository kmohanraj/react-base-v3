import Cards from "components/atoms/Cards";
import { FC } from "react";
import InfoBox from "components/atoms/InfoBox";
import useItToRupees from "hooks/common/useItToRupees";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Table from "components/atoms/v2/Table";

const data = [
  {
    name: "Mohan",
    customer_code: "CS0923",
    collection_amount: "100",
  },
  {
    name: "Mohan",
    customer_code: "CS0924",
    collection_amount: "200",
  },
  {
    name: "Mohan",
    customer_code: "CS0925",
    collection_amount: "300",
  },
  {
    name: "Mohan",
    customer_code: "CS0926",
    collection_amount: "400",
  },
  {
    name: "Mohan",
    customer_code: "CS0927",
    collection_amount: "500",
  },
];

const DashboardPage: FC = () => {
  const cols = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Group Code",
      selector: (row: any) => row.customer_code,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.collection_amount,
      sortable: true,
    },
  ];

  const collectionData = [
    {
      id: 1,
      label: "Today Collection",
      amount: useItToRupees("2000"),
    },
    {
      id: 2,
      label: "Total Collection",
      amount: useItToRupees("10000"),
    },
    {
      id: 3,
      label: "Today Expenses",
      amount: useItToRupees("40000"),
    },
    {
      id: 4,
      label: "Total Expenses",
      amount: useItToRupees("3000"),
    },
  ];
  const userData = [
    {
      id: 1,
      label: "Active Customers",
      amount: "2,400",
    },
    {
      id: 2,
      label: "Active Branches",
      amount: "19",
    },
    {
      id: 3,
      label: "Active Employees",
      amount: "170",
    },
  ];
  return (
    <div className="home-page">
      <section className="col-4 collection-details">
        <Cards cardData={collectionData} />
      </section>
      <section className="col-2">
        <div className="collection-history">
          <Table
            title="Latest Collection"
            loading={false}
            cols={cols}
            data={data}
          />
        </div>
        <section>
          <InfoBox />
          <InfoBox />
          <InfoBox />
        </section>
      </section>
      <section className="col-3">
        <Cards cardData={userData} />
      </section>
    </div>
  );
};

export default DashboardPage;
