import React, { useState, useEffect, useReducer } from "react";

import TableFilters from "../../components/QueryView/TableFilters/TableFilters";
import DynamicTable from "../../components/QueryView/DynamicTable/DynamicTable";
import TablePagination from "../../components/QueryView/TablePagination/TablePagination";
import DynamicForm, {
  InputDescriptor,
} from "../../components/QueryView/DynamicForm/DynamicForm";
import useHttp from "../../hooks/http";
import styles from "./Services.module.css";
type Props = {};

interface FilterElement {
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  upCase?: boolean;
  items?: Array<UrlItem>;
  selectedItemKey?: string;
  classes?: Array<string>;
}

interface TableData {
  id: number;
  contents: Array<string>;
  actions: Array<string>;
}

interface UrlItem {
  key: string;
  value: string;
}

interface Action {
  data: any | null;
  type: string;
}

const Services: React.FC<Props> = ({}) => {
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

  const initialFilterElements = [
    { name: "id", type: "text", placeholder: "Id", value: "" },
    {
      name: "numero_documento",
      type: "text",
      placeholder: "Numero de documento",
      value: "",
    },
    {
      name: "primer_nombre",
      type: "text",
      placeholder: "Primer nombre",
      upCase: true,
      value: "",
    },
    {
      name: "primer_apellido",
      type: "text",
      placeholder: "Primer apellido",
      upCase: true,
      value: "",
    },
    {
      name: "fecha_inicio",
      type: "date",
      placeholder: "Fecha inicio",
      value: "",
    },
    {
      name: "fecha_fin",
      type: "date",
      placeholder: "Fecha fin",
      value: "",
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

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear,
  } = useHttp();

  let actionTriggered = (id: number, action: string) => {
    alert(`number:${id}, action:${action}`);
  };

  let pageChanged = (page: number, step: number) => {
    setCurrentPage(page);
    setCurrentStep(step);
    //(`page=${page} and step=${step}`);
    fetchData(page);
  };
  const filterActionTriggered = (action: string) => {
    if (action === "buscar") {
      fetchData();
    } else {
      alert(currentPage);
    }
  };
  const valueChanged = (name: string, value: string) => {
    let updatedFilterElements = [...filterElements];
    updatedFilterElements.forEach(function (item: FilterElement) {
      if (item.name == name) {
        if (
          item.type == "text" ||
          item.type == "date" ||
          item.type == "number"
        ) {
          item.value = value;
        } else {
          if (item.type == "select") {
            item.selectedItemKey = value;
          }
        }
      }
    });
    setFilterElements(updatedFilterElements);
  };

  const reducer = (currentFetchedData: Array<TableData>, action: Action) => {
    switch (action.type) {
      case "SET":
        return action.data;
      default:
        throw new Error("Should not get there!");
    }
  };

  const [fetchedData, dispatch] = useReducer(reducer, Array<TableData>());
  //const [fetchedData, setFetchedData] = useState<Array<TableData>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterElements, setFilterElements] = useState<Array<FilterElement>>(
    initialFilterElements
  );

  useEffect(() => {
    // Only runs once
    fetchData();
  }, []);

  useEffect(() => {
    // Run everytime the useHttp hook is loading, retreiving data or retreiving some error
    if (!isLoading && !error && reqIdentifer === "SET") {
      let myData: Array<TableData> = [];
      setTotalPages(data.total_pages);
      data.items.forEach(function (item: any) {
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
      dispatch({ type: "SET", data: myData });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  let fetchData = (page: number = 1) => {
    const params = filterParamsUrl();
    sendRequest(
      `http://localhost:4000/v1/services?page=${page}&size=${10}&${params}`,
      "GET",
      null,
      null,
      "SET"
    );
  };

  const filterParams = (): Array<UrlItem> => {
    const result: Array<UrlItem> = [];
    filterElements.forEach(function (item: FilterElement) {
      if (item.type == "text" || item.type == "date") {
        result.push({ key: item.name, value: item.value! });
      } else {
        if (item.type == "select") {
          result.push({ key: item.name, value: item.selectedItemKey! });
        }
      }
    });
    return result;
  };

  const filterParamsUrl = (): string => {
    let result: Array<string> = [];
    filterParams()
      .filter((i) => i.value !== "")
      .forEach(function (item: UrlItem) {
        result.push(`${item.key}=${encodeURIComponent(item.value)}`);
      });
    return result.join("&");
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

  if (!isLoading && !error && fetchedData.length === 0) {
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
    if (isLoading && !error) {
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
                <h3 className="display-4">Cargando ...</h3>
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (!isLoading && error) {
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
    }
    if (!isLoading && !error) {
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
    }
  }

  // ------------------------------------------------------------------- NEW RECORD --
  const newRecordInitialElements: Array<InputDescriptor> = [
    {
      displayName: "Primer nombre",
      name: "primer_nombre",
      type: "text",
      placeholder: "",
      value: "",
      required: true,
    },
    {
      displayName: "Segundo nombre",
      name: "segundo_nombre",
      type: "text",
      placeholder: "",
      value: "",
      required: false,
    },
    {
      displayName: "Primer apellido",
      name: "primer_apellido",
      type: "text",
      placeholder: "",
      value: "",
      required: true,
    },
    {
      displayName: "Segundo apellido",
      name: "segundo_apellido",
      type: "text",
      placeholder: "",
      value: "",
      required: false,
    },
    {
      displayName: "Edad",
      name: "edad",
      min: 0,
      max: 200,
      type: "number",
      placeholder: "",
      value: "",
      required: true,
    },
    {
      displayName: "Estado civil",
      name: "estado_civil",
      type: "select",
      placeholder: "Escoja una opcion",
      items: [
        { key: "1", value: "Soltero" },
        { key: "2", value: "Casado" },
        { key: "3", value: "Union libre" },
      ],
      selectedItemKey: "",
      required: true,
    },
    {
      displayName: "Fecha nacimiento",
      name: "fecha_nacimiento",
      type: "date",
      placeholder: "",
      value: "",
      required: true,
    },
    {
      displayName: "Observación",
      name: "id",
      type: "textarea",
      placeholder: "Escriba aqui algo",
      value: "",
      required: true,
    },
  ];

  const [showNewRecordForm, setShowNewRecordForm] = useState(true);
  const [newRecordElements, setNewRecordElements] = useState<
    Array<InputDescriptor>
  >(newRecordInitialElements);
  const httpHookNewRecord = useHttp();
  const clearNewRecordForm = httpHookNewRecord.clear;
  const dataNewRecordForm = httpHookNewRecord.data;
  const errorNewRecordForm = httpHookNewRecord.error;
  const isLoadingNewRecordForm = httpHookNewRecord.isLoading;
  const reqExtraNewRecordForm = httpHookNewRecord.reqExtra;
  const reqIdentifierNewRecordForm = httpHookNewRecord.reqIdentifer;
  const sendRequestNewRecordForm = httpHookNewRecord.sendRequest;

  const submittedNewRecordForm = (data: any) => {
    // HERE GOES THE HTTP LOGIC!!
    //fetchData(currentPage);
    setShowNewRecordForm(false);
    setNewRecordElements(newRecordInitialElements);
  };

  const newRecordFormValueChanged = (name: string, value: string) => {
    let updatedNewRecordElements = [...newRecordElements];
    updatedNewRecordElements.forEach(function (item: InputDescriptor) {
      if (item.name == name) {
        if (
          item.type == "text" ||
          item.type == "date" ||
          item.type == "number" ||
          item.type == "textarea"
        ) {
          item.value = value;
        } else {
          if (item.type == "select") {
            item.selectedItemKey = value;
          }
        }
      }
    });
    setNewRecordElements(updatedNewRecordElements);
  };

  const closeNewRecordForm = () => {
    setShowNewRecordForm(false);
  };

  const newRecordForm = (
    <DynamicForm
      elements={newRecordElements}
      title="Nuevo servicio"
      submitText="Crear registro"
      show={showNewRecordForm}
      size="lg"
      submitEnabled={isLoadingNewRecordForm}
      handleClose={() => closeNewRecordForm()}
      submitted={(data: any) => submittedNewRecordForm(data)}
      valueChanged={(name: string, value: string) =>
        newRecordFormValueChanged(name, value)
      }
    />
  );

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
            valueChanged={valueChanged}
          />
          <div className="col-10">{table}</div>
        </div>
      </div>
      {newRecordForm}
    </>
  );
};

export default Services;
