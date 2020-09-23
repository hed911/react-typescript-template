## Commands to create this project

npx create-react-app hedu911-template --template typescript
yarn add bootstrap
yarn add react-bootstrap
yarn add @types/redux
yarn add @types/react-redux
yarn add react-redux
yarn add redux-thunk
yarn add react-router-dom
yarn add @types/react-router-dom
yarn add axios

## Next features to develop

X Upload code to github
X Create select elements component
X Create the column
X Conectar con llamado hacia la API
X Hace que la funcion click ejecute una funcion del componente padre

- Generar los parametros del GET de la URL de manera dinamica apartir de
  los campos que esten seleccionados en el panel de filtros izquierdo "?numero_documento=1020&tipo=1..."
- Hacer que cada vez que se hace click en buscar, se ejecute el llamado hacia la API pero con los parametros escogidos
  X Hacer el parseo de los datos que vienen de la API hacia el objeto fetchedData
- Handle empty state when table is empty and when there are errors
