"use client"

import { useState, useMemo } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Purchase } from "@/types/purchases"
import dayjs from "dayjs"
import { formatToBRL } from "@/helpers/formatPriceToBRL"
import { statusToPtBr } from "@/lib/utils"

export default function PurchaseHistoryTable({
  purchaseData,
}: {
  purchaseData: Purchase[]
}) {
  // filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, _setPlanFilter] = useState<string>("all")
  const [statusFilter, _setStatusFilter] = useState<string>("all")

  // ordenação
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // paginação
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredAndSortedData = useMemo(() => {
    const filtered = purchaseData.filter((record) => {
      const statusPtBr = statusToPtBr(record.status)
      const matchesSearch =
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.plan.publicName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        statusPtBr.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPlan =
        planFilter === "all" || record.plan.publicName === planFilter
      const matchesStatus =
        statusFilter === "all" ||
        record.status === statusFilter ||
        statusPtBr === statusFilter

      return matchesSearch && matchesPlan && matchesStatus
    })

    if (sortColumn) {
      filtered.sort((a, b) => {
        let aValue: string | number | object
        let bValue: string | number | object

        switch (sortColumn) {
          case "id":
            aValue = a.id
            bValue = b.id
            break
          case "date":
            aValue = a.createdAt
            bValue = b.createdAt
            break
          case "plan":
            aValue = a.plan
            bValue = b.plan
            break
          case "payment":
            aValue = a.status
            bValue = b.status
            break
          case "value":
            aValue = a.amount
            bValue = b.amount
            break
          case "status":
            aValue = a.status
            bValue = b.status
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
  }, [searchTerm, planFilter, statusFilter, sortColumn, sortDirection])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAndSortedData.slice(startIndex, endIndex)
  }, [filteredAndSortedData, currentPage, itemsPerPage])

  const totalItems = filteredAndSortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Badge className="bg-[#C2ED79] text-black border-[#7BC625] font-bold px-20 py-2">
            Pago
          </Badge>
        )
      case "DECLINED_NO_LIMIT":
        return (
          <Badge className="bg-[#FFA789] text-black border-[#FF4E3A] font-bold px-20 py-2">
            Recusado - Sem limite
          </Badge>
        )
      case "NOT_AUTHORIZED":
        return (
          <Badge className="bg-[#FFA789] text-black border-[#FF4E3A] font-bold px-20 py-2">
            Não autorizado
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

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
        <h1 className="text-2xl font-semibold text-gray-900">
          Histórico de Compras
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Plano, Status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                    Nº Pedido
                    <SortIcon column="id" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("date")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Data
                    <SortIcon column="date" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("plan")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Plano
                    <SortIcon column="plan" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("payment")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Pagamento
                    <SortIcon column="payment" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("value")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    Valor
                    <SortIcon column="value" />
                  </Button>
                </TableHead>
                <TableHead className="font-medium text-gray-700 py-4 ">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("status")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 cursor-pointer "
                  >
                    Status
                    <SortIcon column="status" />
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
                    <TableCell className="font-medium text-gray-900 py-4">
                      {record.id.slice(0, 6)}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {dayjs(record.createdAt).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {record.plan.publicName}
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">Cartão</TableCell>
                    <TableCell className="text-gray-700 py-4">
                      {formatToBRL(record.amount)}
                    </TableCell>
                    <TableCell className="py-4">
                      {getStatusBadge(record.status)}
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
