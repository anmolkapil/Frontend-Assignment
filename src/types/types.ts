import type { UseFormReturn, ValidationRule } from 'react-hook-form'

type UIType = 'Radio' | 'Input' | 'Select' | 'Switch' | 'Group' | 'Ignore'

interface ValidationOption {
	label: string
	value: string
	description: string
	icon: string
}

interface Condition {
	jsonKey: string
	op: string
	value: string
	action: string
}

interface Validation {
	required?: boolean
	options?: ValidationOption[]
	defaultValue?: string | boolean
	immutable?: boolean
	pattern?: string
}

export interface UIParameter {
	sort: number
	label: string
	description: string
	validate: Validation
	jsonKey: string
	uiType: UIType
	icon: string
	level: number
	placeholder: string
	subParameters?: UIParameter[]
	conditions?: Condition[]
	disable?: boolean
}

export type UIConfiguration = UIParameter[]

export interface FormFieldProps {
	fieldConfig: UIParameter
	form: UseFormReturn<any>
	parent: string | null
	globalShowAdvanced: boolean
}
