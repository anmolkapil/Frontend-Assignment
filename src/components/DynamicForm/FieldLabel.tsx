import { FormLabel } from '@/components/ui/form'
import { Label as L } from '@/components/ui/label'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

import { removeUnderscores } from '@/utils/utils'
import { UIParameter } from '@/types/types'

interface FieldLabelProps {
	fieldConfig: UIParameter
}

const FieldLabel: React.FC<FieldLabelProps> = ({ fieldConfig }) => {
	const Label = fieldConfig.uiType === 'Group' ? L : FormLabel
	return (
		<Label>
			{removeUnderscores(fieldConfig.label)}
			{fieldConfig?.validate?.required && (
				<span className='text-red-400'>*</span>
			)}
			{fieldConfig.description.length > 0 && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<div className='ml-2 rounded-full bg-blue-500 h-4 w-4 grid items-center text-white font-mono text-xs'>
								i
							</div>
						</TooltipTrigger>
						<TooltipContent className='bg-white border border-sky-100 text-sm'>
							<div>
								<span className='text-gray-900'>{fieldConfig.label}</span>
								<Separator className='my-1' />
								<span className='text-slate-600'>
									{fieldConfig.description}
								</span>
							</div>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</Label>
	)
}

export default FieldLabel
