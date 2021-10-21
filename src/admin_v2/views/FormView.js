const FormViewLayout = (fields) => {

}

export const FormView = () => {
    const fields = {
        firstName: <span>First Name Input</span>,
        lastName: <span>Last Name Input</span>
    }
    return <FormViewLayout fields={fields}/>
}
