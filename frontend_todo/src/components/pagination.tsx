//@ts-nocheck
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


export default function Paging({ currentPage, setCurrentPage, totalPages }: { currentPage: number, setCurrentPage: () => void, totalPages: number}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-700`}
                    />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className={`${currentPage === i + 1 ? 'bg-blue-600' : 'bg-zinc-800'} text-zinc-100 hover:bg-zinc-700 border-zinc-700`}
                        >
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border-zinc-700`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
