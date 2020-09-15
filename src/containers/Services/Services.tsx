import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import TableFilters from "../../components/QueryView/TableFilters/TableFilters";
import DynamicTable from "../../components/QueryView/DynamicTable/DynamicTable";
type Props = {};

const Services: React.FC<Props> = ({}) => {
  const filterElements = [
    { name: "id", type: "text", placeholder: "Id" },
    {
      name: "numero_documento",
      type: "text",
      placeholder: "Numero de documento",
    },
    {
      name: "primer_nombre",
      type: "text",
      placeholder: "Primer nombre",
      upCase: true,
    },
    {
      name: "primer_apellido",
      type: "text",
      placeholder: "Primer apellido",
      upCase: true,
    },
    {
      name: "fecha_inicio",
      type: "date",
      placeholder: "Fecha inicio",
    },
    {
      name: "fecha_fin",
      type: "date",
      placeholder: "Fecha fin",
      value: "1990-12-12",
    },
    {
      name: "estado",
      type: "select",
      placeholder: "Estado",
      items: [
        { key: "1", value: "Pendiente" },
        { key: "2", value: "Aprobado" },
        { key: "3", value: "Rechazado" },
      ],
      selectedItemKey: "",
    },
    {
      name: "tipo",
      type: "select",
      placeholder: "Tipo",
      items: [
        { key: "1", value: "Medico" },
        { key: "2", value: "Enfermera" },
        { key: "3", value: "Jefe" },
      ],
      selectedItemKey: "",
    },
    {
      name: "submit_btn",
      type: "submit",
      placeholder: "Buscar",
      value: "Buscar",
      classes: ["btn", "btn-primary"],
    },
    {
      name: "submit_btn",
      type: "submit",
      placeholder: "Buscar",
      value: "Exportar V1",
      classes: ["btn", "btn-warning"],
    },
    {
      name: "submit_btn",
      type: "submit",
      placeholder: "Buscar",
      value: "Exportar V2",
      classes: ["btn", "btn-warning"],
    },
  ];
  let tableHeaders = [
    "Id",
    "Estado",
    "Tipo",
    "Categoria",
    "Empresa Asignada",
    "Solicitante",
    "Fecha",
  ];
  let data = [
    {
      id: 1,
      contents: [
        "10",
        "Aprobado",
        "Multiple",
        "Experimental",
        "Microsoft",
        "Edward Collen",
        "2020/12/12",
      ],
      actions: ["edit", "aprobe", "delete"],
    },
    {
      id: 2,
      contents: [
        "10",
        "Aprobado",
        "Multiple",
        "Experimental",
        "Microsoft",
        "Edward Collen",
        "2020/12/12",
      ],
      actions: ["edit", "aprobe", "delete"],
    },
    {
      id: 3,
      contents: [
        "10",
        "Aprobado",
        "Multiple",
        "Experimental",
        "Microsoft",
        "Edward Collen",
        "2020/12/12",
      ],
      actions: ["edit", "delete"],
    },
  ];
  const actions = {
    edit: {
      theClass: "btn btn-primary",
      label: "Editar",
    },
    aprobe: {
      theClass: "btn btn-warning",
      label: "Aprobar",
    },
    delete: {
      theClass: "btn btn-danger",
      label: "Borrar",
    },
  };

  let actionTriggered = (id: number, action: string) => {
    alert(`number:${id}, action:${action}`);
  };

  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<Array<TableData>>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios("http://localhost:4000/v1/services"); // add the GET URI dynamically
        parseData(result.data);
      } catch (err) {
        alert(`Ocurrió un error porfavor reintente ${err}`);
      }
    };
    fetchData();
  }, []);

  interface TableData {
    id: number;
    contents: Array<string>;
    actions: Array<string>;
  }

  let parseData = (response: AxiosResponse) => {
    let myData: Array<TableData> = [];
    response.data.items.forEach(function (item: any) {
      let actions = ["edit"];
      if (item.categoria_enum == 1) {
        actions.push("aprobe");
        actions.push("delete");
      }
      myData.push({
        id: item.id,
        contents: [
          item.id,
          item.estado,
          item.tipo,
          item.categoria,
          item.empresa_asignada,
          item.solicitante,
          item.fecha,
        ],
        actions: actions,
      });
    });
    setFetchedData(myData);
  };

  return (
    <>
      <div className="container-fluid">
        <h1>
          Consulta <small>Servicios</small>
        </h1>
        <div className="row">
          <TableFilters elements={filterElements} />
          <div className="col-10">
            <div className="container-fluid">
              <div className="table-responsive">
                <DynamicTable
                  headers={tableHeaders}
                  data={fetchedData}
                  actions={actions}
                  actionTriggered={actionTriggered}
                />
              </div>
            </div>

            <div className="container">
              <div>TablePaginator</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
