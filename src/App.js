import formJSON from './formElement.json';
import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

const EXPLORER_URL = "https://explorer.iota.org/mainnet/transaction"; 

function App() {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0])

  }, [])
  const { fields, page_label } = elements ?? {}
  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await fetch("http://localhost:3001/create", {
      method: "POST",
      body: {
        FirstName: fields[0].field_value, 
        LastName: fields[1].field_value, 
        size: fields[4].field_value, 
        shoeSize: fields[5].field_value, 
        Birth: fields[2].field_value, 
        gender: fields[3].field_value, 
        address: fields[6].field_value, 
        city: fields[7].field_value, 
        state: fields[8].field_value, 
        postalCode: fields[9].field_value, 
        country: fields[10].field_value
      }
    })

    const json = await result.json()
    console.log(json)
    window.location.replace(`${EXPLORER_URL}/${json.did.messageId}`)

    // console.log(elements)
  }
  const handleChange = (id, event) => {
    const newElements = { ...elements }
    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }


      }
      setElements(newElements)
    });
    //console.log(elements)
  }
  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
      <br></br>
      <h1 style={{color: "lightblue", marginLeft: "0px"}}>ILAB</h1>
      <br></br>
        <h3>{page_label}</h3>
        <br></br>
        <form style={{paddingRight: "20%", paddingLeft: "20%"}}>
          {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
          <br></br>
          <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </form>

      </div>
    </FormContext.Provider>
  );
}

export default App;

