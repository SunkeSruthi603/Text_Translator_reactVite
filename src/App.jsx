import { useState } from "react";
import axios from "axios";
import { LoaderCircle} from "lucide-react";

function App() 
{
  const [textInput, setTextInput ] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)



  const handleTextTranslation = async () => {
    setLoading(true)
    try{
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '669c30fae9msh7cc5e8f74a1c97cp11c946jsn034e9cace777',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: textInput,
          source: "en",
          target: selectValue,
          format: "text"
        }
      };
      const response = await axios.request(options)
      setLoading(false)
      console.log("Translation response:", response?.data?.data?.translations?.[Number(0)]?.translatedText)
      setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText)
    }
    catch(error){
      setLoading(false)
      console.log("Translation error:", error?.data) }
    }
  console.log(textInput)
  console.log(selectValue)
  return (
    <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">

      <div className="flex items-center justify-center flex-col gap-y-10 ">

        <h1 className="text-3xl text-zinc700 font-bold">
          Text Translator</h1>

        <div className="flex items-center justify-center flex-col gap-y-5">

          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-slate-700 
          outline-none rounded-lg text-lg px-5 py-2" onChange={(e) => setTextInput(e.target.value)}/>

          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-slate-700 
          outline-none rounded-lg text-lg px-5 py-2" value={result} readOnly/>

        </div>

        <div>
          <label htmlFor="options">Converted Into:</label>

          <select name="value" className="bg-white px-2 py-1 rounded-lg 
          border border-zinc-700 outline-none cursor-pointer"
          onChange={(e) => setSelectValue(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <button className="bg-slate-700 text-slate-100 mx-auto w-[500px] py-2 rounded-lg
        cursor-pointer flex items-center justify-center" onClick={handleTextTranslation}>
          {
            loading ? 
            (<LoaderCircle className="animate-spin"/> )
            : "Translate"
          }
        </button>
      </div>
    </div>
  );
}


export default App;