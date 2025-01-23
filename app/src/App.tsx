import React from 'react';
import AppRouter from './routes/routes';
import QueryProvider from './api/QueryProvider';


function App() {
  return (
    <div className="App">
      <QueryProvider>
          <AppRouter />
       </QueryProvider>
    </div>
  );
}

export default App;
