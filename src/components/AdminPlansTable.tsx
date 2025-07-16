import { Input } from "./ui/input"
import { ChevronUp, ChevronDown, Search } from "lucide-react"
import { Button } from "./ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select"
import { formatToBRL } from "../helpers/formatPriceToBRL"
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"
import { useMemo, useState } from "react"
import { FiCheck } from "react-icons/fi"
import type { Plan } from "@/types/Plan"
import { toast } from "react-toastify"
import { PiCopyLight } from "react-icons/pi"
import { Link } from "react-router-dom"

const AdminPlansTable = ({ plans }: { plans: Plan[] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredAndSortedData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase()
    const filtered = plans.filter((record) => {
      return (
        record.id.toLowerCase().includes(lowerSearch) ||
        record.publicName.toLowerCase().includes(lowerSearch) ||
        (record.internalName?.toLowerCase().includes(lowerSearch) ?? false) ||
        String(record.monthlyPrice).toLowerCase().includes(lowerSearch) ||
        String(record.annualPrice).toLowerCase().includes(lowerSearch) ||
        String(record.offlineCredits).toLowerCase().includes(lowerSearch) ||
        String(record.onlineCredits).toLowerCase().includes(lowerSearch) ||
        (record.isActive ? "sim" : "não").includes(lowerSearch) ||
        (record.isRecommended ? "sim" : "não").includes(lowerSearch) ||
        (record.paymentLink?.toLowerCase().includes(lowerSearch) ?? false)
      )
    })

    if (sortColumn) {
      filtered.sort((a, b) => {
        let aValue: string | number | object | boolean
        let bValue: string | number | object | boolean

        switch (sortColumn) {
          case "id":
            aValue = a.id
            bValue = b.id
            break
          case "name":
            aValue = a.publicName
            bValue = b.publicName
            break
          case "price":
            aValue = a.monthlyPrice
            bValue = b.monthlyPrice
            break
          case "annualPrice":
            aValue = a.annualPrice
            bValue = b.annualPrice
            break
          case "offlineCredits":
            aValue = a.offlineCredits
            bValue = b.offlineCredits
            break
          case "onlineCredits":
            aValue = a.onlineCredits
            bValue = b.onlineCredits
            break
          case "isActive":
            aValue = a.isActive
            bValue = b.isActive
            break
          case "onlineCredits":
            aValue = a.onlineCredits
            bValue = b.onlineCredits
            break
          case "recommended":
            aValue = a.isRecommended
            bValue = b.isRecommended
            break
          case "paymentLink":
            aValue = a.paymentLink || ""
            bValue = b.paymentLink || ""
            break
          default:
            return 0
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [searchTerm, sortColumn, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAndSortedData.slice(startIndex, endIndex)
  }, [filteredAndSortedData, currentPage, itemsPerPage])

  const totalItems = filteredAndSortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1)
  }

  const handleCopy = async (link: string, id: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 1500)
      toast.success("Link copiado com sucesso")
    } catch (err) {
      console.error("Erro ao copiar link:", err)
      toast.error("Erro ao copiar link")
    }
  }

  const SortIcon = ({ column }: { column: string }) => {
    if (sortColumn !== column) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-gray-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-gray-600" />
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Tabela de Planos
          </h1>
          <Link
            to="/admin/new-plan"
            className="text-white bg-[#3B51FF] px-3 py-1.5 sm:py-2 rounded-full text-xl hover:bg-[#3B51FF]/80 transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Criar Plano
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
            <Input
              placeholder="Plano, Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 max-w-sm rounded-full"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("id")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Id
                    <SortIcon column="id" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Nome
                    <SortIcon column="name" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("price")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Preço
                    <SortIcon column="price" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("annualPrice")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Preço Anual
                    <SortIcon column="annualPrice" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("offlineCredits")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Qtd. Créditos off
                    <SortIcon column="offlineCredits" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4 ">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("onlineCredits")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer "
                  >
                    Qtd. Créditos on
                    <SortIcon column="onlineCredits" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4 ">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("isActive")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer "
                  >
                    Ativo
                    <SortIcon column="isActive" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4 ">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("recommended")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer "
                  >
                    Recomendado
                    <SortIcon column="recommended" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4 ">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("paymentLink")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer "
                  >
                    Links
                    <SortIcon column="paymentLink" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    Nenhum resultado encontrado
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((record, index) => (
                  <TableRow
                    key={record.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <TableCell className="text-gray-700 py-4">
                      {record.id}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.publicName}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {formatToBRL(record.monthlyPrice)}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {formatToBRL(record.annualPrice)}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.offlineCredits}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.onlineCredits === "UNLIMITED"
                        ? "ILIMITADOS"
                        : record.onlineCredits}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.isActive ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.isRecommended ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.paymentLink ? (
                        <button
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() =>
                            handleCopy(record.paymentLink ?? "", record.id)
                          }
                          title="Copiar link de pagamento"
                        >
                          {copiedId === record.id ? (
                            <FiCheck size={18} />
                          ) : (
                            <PiCopyLight size={15} />
                          )}
                          <span className="sr-only">Copiar link</span>
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Mostrando</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-16 h-8 p-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-700">
                de {totalItems} items
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-700 px-2">
                {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-transparent"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPlansTable
