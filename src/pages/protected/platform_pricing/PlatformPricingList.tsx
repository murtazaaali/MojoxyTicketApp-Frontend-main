import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PencilIcon, TrashIcon } from "lucide-react"
import type { PlatformPricing } from "../../../types"
import usePlatformPricingStore from "../../../store/platform_pricing"
import { Button } from "../../../components/ui"
import TopHeader from "../../../components/shared/table/TopHeader"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/shared/table/Table"

const PlatformPricingList = () => {

    const { platform_pricing, fetchPlatformPricing, deletePlatformPricing, isFetched } = usePlatformPricingStore();

    const navigate = useNavigate()

    useEffect(() => {
        if (!isFetched) fetchPlatformPricing();
    }, [fetchPlatformPricing, isFetched]);

    const editPlatformPricing = (platform: PlatformPricing) => {
        navigate(`/dashboard/platform_pricing/${platform?._id}`);
    }



    return (
        <div className=" text-white">
            <TopHeader title={"All Platform Pricing"}
                description={"Manage and view all platform pricing"}
                buttonTitle="Add Platform Pricing" buttonLink="/dashboard/platform_pricing" />
            <div className="overflow-hidden rounded-xl border border-gray-700 ">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-700">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 text-center">
                                    Commission Type
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-center">
                                    Price
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 text-center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-700">
                            {platform_pricing.map((platform) => (
                                <TableRow key={platform._id}>
                                    <TableCell className="px-4 py-3 text-center">
                                        {platform?.commission_type || "TYPE"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {platform?.value || 0}
                                    </TableCell>
                                    <TableCell className="px-4 py-3">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => editPlatformPricing(platform)}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => deletePlatformPricing(String(platform?._id))}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default PlatformPricingList
