import { useContext } from "react";
import styled from "styled-components";
import Card from "../components/Card/Card";
import ManagerSelect from "../components/ManagerSelect/ManagerSelect";
import Table from "../components/Table/Table";
import { TextWrapper } from "../components/Table/Table.style";
import { isEmpty } from "../components/Cards/Helpers";
import {
  Action_SetPage,
  Action_SetRecords,
  Action_SortData,
  Action_ToggleField,
  Action_ToggleSelectAll,
} from "../context/TablePageContext/TableActions";
import { TableStoreContext } from "../context/TablePageContext/TableStore";
import { Page, PageContainer } from "./pages.style";
import { useState } from "react";

// This is the page aka the parent component for every single component that is being rendered for the table including
// Manager Id selector, Table component , Download button etc..

// !CHANGED : handling the dropdown's toggle state within the dropdown component instead of where it's being used in, and pass an argument to control whether the component should collapse on selecting a field or not
// !CHANGED: put the multiselect inside the table component for now
// !CHANGED: put the page navigator inside the table component
// !CHANGED: put the Serach Records inside the table component
// !CHANGED: passing the click handlers directly as props instead of dispatch and actions
// !CHANGED: the sortableData is not called customerData is there is more than one type of data on this page now.....
const TablePage = () => {
  const {
    selectedFields,
    customerData,
    dashboardData,
    currentPage,
    totalPages,
    tableDispatch,
    records,
  } = useContext(TableStoreContext);

  // setting up data for the CSV file that'll be downloaded

  const [unit, setUnit] = useState("");


  return (
    <Page>
      <PageContainer>
        <PageLayout>
          <TextWrapper>
            <h1>Customer Data</h1>
          </TextWrapper>

          <ManagerSelect />

          {!isEmpty(dashboardData) && <Card dashboardData={dashboardData} setUnit={setUnit}/>}
           {/* {console.log(selectedFields)} */}
          
          {selectedFields.length > 0 ? (
            <>
              <Table
                sortableData={customerData}
                selectedFields={selectedFields}
                currentPage={currentPage}
                totalPages={totalPages}
                records={records}
                setPageHandler={(page) => tableDispatch(Action_SetPage(page))}
                sortHandler={(key, order) =>
                  tableDispatch(Action_SortData(key, order))
                }
                selectAllHandler={(allSelected) =>
                  tableDispatch(Action_ToggleSelectAll(allSelected))
                }
                toggleFieldHandler={(field) =>
                  tableDispatch(Action_ToggleField(field))
                }
                setRecordHandler={(records) => {
                  tableDispatch(Action_SetRecords(records));
                }}
                unit={unit}
                // setUnit={setUnit}
              />
            </>
          ) : (
            <TextWrapper>
              <h3>Select a Manager Id</h3>
            </TextWrapper>
          )}
        </PageLayout>
      </PageContainer>
    </Page>
  );
};

const PageLayout = styled.div`
  width: 100%;
  
`;

export default TablePage;
