import './style.css';

declare global {
    interface Object {
        mergeobject: (obj: any) => any;
    }
}

const Form = ({ onSubmit }: { onSubmit: (values: any[]) => any }): JSX.Element => {
    const transformToObject = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const { elements } = event.target as HTMLFormElement;
        const inputs = Array.from(elements).filter(element => element instanceof HTMLInputElement);
        const values = (inputs as HTMLInputElement[]).filter(el => el.name).reduce((acc, el) => ({ ...acc, [el.name]: el.value }), {})

        const values_transformed = Object.entries(values).map(([key, value]) => {
            return key.split("_").reverse().reduce((acc: any, el) => ({ [el]: acc }), value)
        }).reduce((obj, el) => obj.mergeobject(el), {})

        onSubmit(values_transformed);
    }

    return <>
        <h2>Form</h2>
        <form action="#" onSubmit={transformToObject}>
            <input type="text" name="name" placeholder="name" />
            <input type="text" name="username" placeholder="username" />
            <input type="text" name="email" placeholder="email" />
            <input type="text" name="address_street" placeholder="address_street" />
            <input type="text" name="address_suite" placeholder="address_suite" />
            <input type="text" name="address_city" placeholder="address_city" />
            <input type="text" name="address_zipcode" placeholder="address_zipcode" />
            <input type="text" name="address_geo_lat" placeholder="address_geo_lat" />
            <input type="text" name="address_geo_lng" placeholder="address_geo_lng" />
            <input type="text" name="phone" placeholder="phone" />
            <input type="text" name="website" placeholder="website" />
            <input type="text" name="company_name" placeholder="company_name" />
            <input type="text" name="company_catchPhrase" placeholder="company_catchPhrase" />
            <input type="text" name="company_bs" placeholder="company_bs" />

            <button type="submit">Submit</button>
        </form>
    </>
}

export default Form;