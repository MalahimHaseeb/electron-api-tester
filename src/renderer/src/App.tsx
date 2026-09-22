import Badge from "./components/ui/Badge"
import Button from "./components/ui/Button"
import Card from "./components/ui/Card"
import Input from "./components/ui/Input"


function App(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Electron API Tester
          </h1>

          <p className="mt-2 text-muted-foreground">
            Our own design system
          </p>
        </div>

        <Card className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              Request
            </h2>

            <Badge variant="success">
              Ready
            </Badge>
          </div>

          <Input
            placeholder="https://api.example.com/users"
          />

          <div className="flex gap-3">
            <Button>
              Send Request
            </Button>

            <Button variant="outline">
              Cancel
            </Button>

            <Button variant="ghost">
              Clear
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}

export default App