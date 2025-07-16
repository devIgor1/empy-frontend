import AuthenticatedLayout from "@/layouts/AuthenticatedLayout"
import AdminPlansHeader from "@/components/AdminPlansHeader"
import NewPlanForm from "@/components/NewPlanForm"

const NewPlanPage = () => {
  return (
    <AuthenticatedLayout>
      <AdminPlansHeader />
      <NewPlanForm />
    </AuthenticatedLayout>
  )
}

export default NewPlanPage
