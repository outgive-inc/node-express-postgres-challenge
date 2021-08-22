import {
    FormControl as ChakraFormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
} from "@chakra-ui/react"

export const FormControl = ({ id, name, label, placeholder, textarea, value, onChange, errors }) => {
    
    return (
        <ChakraFormControl isInvalid={errors && errors[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            { 
                !textarea
                ? <Input 
                    id={id || name} 
                    name={name} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={e => onChange(e.target.value)}
                />
                : <Textarea 
                    id={id || name} 
                    name={name} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={e => onChange(e.target.value)} 
                    size="sm" 
                />
            }
            <FormErrorMessage>{errors && errors[name] ? errors[name] : ''}</FormErrorMessage>
        </ChakraFormControl>   
    )
}
