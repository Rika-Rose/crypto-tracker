import Header from './Components/Header'
import Table from './Components/Table'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Header />
      <main className="flex flex-col flex-1 w-full overflow-hidden">
      <Table />
      </main>
    </div>
  )
}

export default App
