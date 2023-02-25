import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { ICustomerState } from "../app/type/customer.type";
import { useAppDispatch, useAppSelector } from "../hooks";
import { CustomerType } from "../mirage/types";

type dispatchType = AsyncThunk<any, any, any>;

interface propsGrid {
  dpt: dispatchType;
  customerSelector: ICustomerState;
  columns: GridColDef[];
}

function GridComponent({
  dpt,
  customerSelector,
  columns,
}: propsGrid): JSX.Element {
  const clientDispatch = useAppDispatch();

  useEffect(() => {
    clientDispatch(dpt(null))
  }, []);


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
      
        rows={customerSelector.data}
        rowCount={customerSelector.meta.count}
        columns={columns}
        loading={customerSelector.isLoading}
        pagination
        page={customerSelector.meta.offset}
        pageSize={customerSelector.meta.limit}
        paginationMode={"server"}
        onPageChange={(newPage) => {
          clientDispatch(
            dpt({
              limit: customerSelector.meta.limit,
              offset: newPage,
            })
          );
        }}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        localeText={{
          columnMenuSortAsc: "Ordenar ascendente",
          columnMenuSortDesc: "Ordenar descendente",
          columnMenuFilter: "Filtrar",
          columnMenuHideColumn: "Ocultar",
          columnMenuShowColumns: "Mostrar Cols",
          columnMenuUnsort: "Desordenar",
          filterPanelColumns: "Columnas",
          filterPanelOperatorAnd: "Operación",
          filterOperatorContains: "Contiene",
          filterOperatorEquals: "Igual a",
          filterOperatorStartsWith: "Empieza con",
          filterOperatorEndsWith: "Termina con",
          filterOperatorIsEmpty: "Es nulo",
          filterOperatorIsNotEmpty: "No es nulo",
          filterOperatorIsAnyOf: "Valor cualquiera",
        }}
      />
    </div>
  );
}

export default GridComponent;
