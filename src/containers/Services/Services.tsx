import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import TableFilters from "../../components/QueryView/TableFilters/TableFilters";
import DynamicTable from "../../components/QueryView/DynamicTable/DynamicTable";
import TablePagination from "../../components/QueryView/TablePagination/TablePagination";
import styles from "./Services.module.css";
type Props = {};

enum DataState {
  Loading,
  Loaded,
  Error,
}
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
      name: "buscar",
      type: "submit",
      placeholder: "Buscar",
      value: "Buscar",
      classes: ["btn", "btn-primary"],
    },
    {
      name: "exportar_v1",
      type: "submit",
      placeholder: "Exportar V1",
      value: "Exportar V1",
      classes: ["btn", "btn-warning"],
    },
    {
      name: "exportar_v2",
      type: "submit",
      placeholder: "Exportar V2",
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
  let pageChanged = (page: number, step: number) => {
    setCurrentPage(page);
    setCurrentStep(step);
    //(`page=${page} and step=${step}`);
    fetchData(page);
  };
  let filterActionTriggered = (action: string) => {
    if (action === "buscar") {
      fetchData();
    } else {
      alert(currentPage);
    }
  };

  const [dataState, setDataState] = useState(DataState.Loading);
  const [fetchedData, setFetchedData] = useState<Array<TableData>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = (page: number = 1) => {
    setDataState(DataState.Loading);
    const execute = async () => {
      try {
        const result = await axios(
          `http://localhost:4000/v1/services?page=${page}&size=${10}`
        );
        parseData(result.data);
        setDataState(DataState.Loaded);
      } catch (err) {
        setDataState(DataState.Error);
        //alert(`Ocurrió un error porfavor reintente ${err}`);
      }
    };
    execute();
  };

  interface TableData {
    id: number;
    contents: Array<string>;
    actions: Array<string>;
  }

  let parseData = (response: AxiosResponse) => {
    let myData: Array<TableData> = [];
    setTotalPages(response.data.total_pages);
    response.data.items.forEach(function (item: any) {
      let actions = ["edit"];
      if (item.categoria_enum === 1) {
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

  let table = null;
  let pagination = (
    <TablePagination
      step={currentStep}
      numbersShown={10}
      currentPage={currentPage}
      totalPages={totalPages}
      pageChanged={(page, step) => pageChanged(page, step)}
    />
  );

  if (dataState == DataState.Loaded && fetchedData.length === 0) {
    table = (
      <div className={["container-fluid", styles.fullheight].join(" ")}>
        <div
          className={["jumbotron", "jumbotron-fluid", styles.fullheight].join(
            " "
          )}
        >
          <div className="container">
            <div className="text-center">
              <i className="fas fa-10x fa-file-upload"></i>
              <h2 className="display-4">No se encontraron datos</h2>
              <p>
                No existen registros para los filtros de consulta seleccionados,
                por favor intente con otros filtros
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    switch (dataState) {
      case DataState.Loading: {
        table = (
          <div className={["container-fluid", styles.fullheight].join(" ")}>
            <div
              className={[
                "jumbotron",
                "jumbotron-fluid",
                styles.fullheight,
              ].join(" ")}
            >
              <div className="container">
                <div className="text-center">
                  <i className="fas fa-10x fa-file-upload"></i>
                  <h3 className="display-4">Cargando ...</h3>
                  <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      }
      case DataState.Error: {
        table = (
          <div className={["container-fluid", styles.fullheight].join(" ")}>
            <div
              className={[
                "jumbotron",
                "jumbotron-fluid",
                styles.fullheight,
              ].join(" ")}
            >
              <div className="container">
                <div className="text-center">
                  <i className="fas fa-10x fa-file-upload"></i>
                  <h3 style={{ color: "red" }} className="display-4">
                    Ocurrió un problema
                  </h3>
                  <p>
                    Por favor vuelva a intentar o contactese con nuestros
                    administradores
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      }
      default: {
        table = (
          <div className="container-fluid">
            <div className="table-responsive">
              <DynamicTable
                headers={tableHeaders}
                data={fetchedData}
                actions={actions}
                actionTriggered={actionTriggered}
              />
              {pagination}
            </div>
          </div>
        );
        break;
      }
    }
  }

  return (
    <>
      <div className="container-fluid">
        <h1>
          Consulta <small>Servicios</small>
        </h1>
        <div className="row">
          <TableFilters
            elements={filterElements}
            actionTriggered={filterActionTriggered}
          />
          <div className="col-10">{table}</div>
        </div>
      </div>
    </>
  );
};

export default Services;
