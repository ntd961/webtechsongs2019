import {ChangeEvent, FocusEvent, FormEvent, ReactElement, useState} from "react";
import {mergeObjectKeys} from "../Utils";

export interface ValidationResult {
	errorName: string;
	valid: boolean;
}

export type Validator<V> = (value: FormFieldValue<V>) => ValidationResult;
export type FormFieldBuilder<V> = { [key in FormFieldKey<V>]: (FormFieldValue<V> | Validator<V>[])[] };
export type FormFieldKey<V> = keyof V;
export type FormFieldValue<V> = string | null;

export interface FormField<V> {
	value: FormFieldValue<V>;
	validators: Validator<V>[];
	errors: string[];
	touched: boolean;
}

export type FormFieldHolder<V> = { [key in keyof V]: FormField<V> };

export const useForm = <V>(onSubmit: () => void, initialFields: FormFieldBuilder<V>) => {

	const formFields: FormFieldHolder<V> = (Object.keys(initialFields) as FormFieldKey<V>[])
		.map((name: FormFieldKey<V>) => {
			const init: (FormFieldValue<V> | Validator<V>[])[] = initialFields[name];
			return {
				[name]: {
					value: init[0] as FormFieldValue<V>,
					validators: init[1] as Validator<V>[],
					errors: [] as string[],
					touched: false
				}
			} as FormFieldHolder<V>;
		})
		.reduce(mergeObjectKeys);

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [fields, _setFields] = useState<FormFieldHolder<V>>(formFields);

	const validateAndUpdateState = (fields: FormFieldHolder<V>) => {
		(Object.values(fields) as FormField<V>[]).forEach(validateField);
		_setFields({...fields});
	};
	const validateField = (field: FormField<V>) => {
		field.errors = field.validators.map((validator: Validator<V>) => validator(field.value))
			.filter((validationResult: ValidationResult) => !validationResult.valid)
			.map((validationResult: ValidationResult) => validationResult.errorName);
	};
	const hasErrors = (fields: FormFieldHolder<V>) => {
		return (Object.values(fields) as FormField<V>[]).some((field: FormField<V>) => field.errors.length > 0);
	};
	const setTouched = (name: FormFieldKey<V>, touched: boolean) => {
		_setFields((fields: FormFieldHolder<V>) => {
			const _newFormFieldHolder: FormFieldHolder<V> = {...fields};
			const field: FormField<V> = _newFormFieldHolder[name];
			field.touched = touched;
			validateField(field);
			return _newFormFieldHolder;
		});
	};
	const setFields = (name: FormFieldKey<V>, value: FormFieldValue<V>) => {
		_setFields((fields: FormFieldHolder<V>) => {
			const _newFormFieldHolder: FormFieldHolder<V> = {...fields};
			const field: FormField<V> = _newFormFieldHolder[name];
			field.value = value;
			validateField(field);
			return _newFormFieldHolder;
		});
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitted(true);
		validateAndUpdateState(fields);
		if (!hasErrors(fields)) {
			onSubmit();
		}
	};
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		event.persist();
		// TODO: add the concept of value accessors to add support for selects, input[type="number"], input[type="checkbox"], input[type="radio"], ...
		const value = event.target.value === "" ? null : event.target.value;
		setFields(event.target.name as FormFieldKey<V>, value);
	};
	const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		event.persist();
		setTouched(event.target.name as FormFieldKey<V>, true);
	};
	const hasError = (field: FormField<V>, errorName?: string) => {
		if (errorName !== undefined && errorName !== null) {
			return field.errors.indexOf(errorName) !== -1 && (field.touched || submitted);
		}
		return field.errors.length > 0 && (field.touched || submitted);
	};
	const onError = (field: FormField<V>, errorNames: string[], element: ReactElement) => errorNames.some(errorName => hasError(field, errorName)) ? element :
		null;
	const getClassNames: (field: FormField<V>) => string[] = (field: FormField<V>) => {
		return [hasError(field) ? "invalid" : null].filter(className => className !== null) as string[];
	};

	return {
		fields,
		handleChange,
		handleBlur,
		handleSubmit,
		onError,
		getClassNames
	};
};
