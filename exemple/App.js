
import { View, Text, TouchableOpacity } from 'react-native'
import { AutoComplete, Calendar } from './lib/react-native-4tsistemas';

function App() {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <AutoComplete
                data={[{"id":134, "titulo":"oi", "movel":"armario"}]} // ONDE VOCE CONFIGURA O DATA
                ItemSearch={['titulo', 'movel', 'id']} // OS CAMPOS DO OBJETO QUE SERVIRA PARA FILTRAR
                ItemValue={['id']} // ONDE VOCE CONFIGURA AS CHAVES QUE SERVIRA PARA MONTAR O VALUE ITEM
                valueSelect={{"id":134, "titulo":"oi", "movel":"armario"}} // ONDE VOCE IRA CONFIGURAR O VALUE
                onSelect={(e)=>console.log(e)} // ONDE RETORNA O ITEM SELECIONADO
            />
            {/* <Calendar onSelectDate={(e)=>console.log(e)} RenderButton={(props) => <TouchableOpacity onPress={() => {
                props.setOpen()
            }} style={{ width: 50, height: 50, backgroundColor: "green" }}>

            </TouchableOpacity>} /> */}

        </View>
    );
};

export default App