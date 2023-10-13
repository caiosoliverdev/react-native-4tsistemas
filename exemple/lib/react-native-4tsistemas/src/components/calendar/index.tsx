//       ##   ######             ####     ####     ####    ######   ######   ##   ##    ##      ####
//      ###     ##              ##  ##     ##     ##  ##     ##     ##       ### ###   ####    ##  ##
//     ####     ##              ##         ##     ##         ##     ##       #######  ##  ##   ##
//   ##  ##     ##               ####      ##      ####      ##     ####     ## # ##  ######    ####
//   #######    ##                  ##     ##         ##     ##     ##       ##   ##  ##  ##       ##
//       ##     ##              ##  ##     ##     ##  ##     ##     ##       ##   ##  ##  ##   ##  ##
//       ##     ##               ####     ####     ####      ##     ######   ##   ##  ##  ##    ####

import React, { useState, ReactElement } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { ReturnList, getMonthName, getYearList } from "./list";
import moment from 'moment'

interface Props {
    onSelectDate?: (e: any) => void,
    RenderButton?: (props: any) => ReactElement
};

const Calendar: React.FC<Props> = ({ onSelectDate, RenderButton }) => {
    const [MesSell, setMesSell] = useState(parseInt(moment().format('MM')));
    const [AnoSell, setAnoSell] = useState(parseInt(moment().format('YYYY')));

    const [OpenMesSell, setOpenMesSell] = useState(false);
    const [OpenAnoSell, setOpenAnoSell] = useState(false);

    const [Data, setData] = useState(moment().format('YYYY-MM-DD'));
    const [OpenCalendar, setOpenCalendar] = useState(false);
    const Datas = ReturnList(AnoSell, MesSell);
    const Semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
        <View style={OpenCalendar ? styles.OpenCaledarTrue : styles.OpenCaledarFalse}>
            {OpenCalendar && <TouchableOpacity onPress={() => setOpenCalendar(false)} style={styles.ContainercalendarBg} />}

            <View style={[styles.container]}>
                <View style={styles.btnContainer}>
                    {!OpenCalendar && <View style={{ width: '100%', height: 40, paddingHorizontal: 10 }}>
                        {RenderButton ? RenderButton({
                            setOpen: () => {
                                setMesSell(parseInt(moment(Data).format('MM')));
                                setAnoSell(parseInt(moment(Data).format('YYYY')));
                                setOpenCalendar(true);
                            }
                        }) :
                            <TouchableOpacity onPress={() => {
                                setMesSell(parseInt(moment(Data).format('MM')));
                                setAnoSell(parseInt(moment(Data).format('YYYY')));
                                setOpenCalendar(true);
                            }} style={styles.button}>
                                <Text style={styles.buttonTitle}>{moment(Data).format('DD/MM/YYYY')}</Text>
                            </TouchableOpacity>
                        }
                    </View>}
                    {OpenCalendar && <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.calendar}>

                            <View style={{ zIndex: 150, width: '100%', height: 35, paddingHorizontal: 5, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                                <>
                                    <TouchableOpacity onPress={() => setOpenAnoSell(!OpenAnoSell)} style={{ flexDirection: 'row', height: 35, width: '49%', borderTopLeftRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#aeaeae' }}>
                                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 17 }}>{AnoSell}</Text>
                                    </TouchableOpacity>

                                    {OpenAnoSell && <FlatList
                                        style={styles.suggestionsyearn}
                                        data={getYearList()}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity onPress={() => {
                                                setAnoSell(item);
                                                setOpenAnoSell(false);
                                            }} key={index}>
                                                <View style={styles.suggestionItem}>
                                                    <Text style={{ color: '#545454' }}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />}
                                </>

                                <>
                                    <TouchableOpacity onPress={() => setOpenMesSell(!OpenMesSell)} style={{ flexDirection: 'row', height: 35, width: '49%', borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#aeaeae' }}>
                                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 17 }}>{getMonthName(MesSell)}</Text>
                                    </TouchableOpacity>

                                    {OpenMesSell && <FlatList
                                        style={styles.suggestionsmoon}
                                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity onPress={() => {
                                                setMesSell(item);
                                                setOpenMesSell(false);
                                            }} key={index}>
                                                <View style={[styles.suggestionItem, { backgroundColor: MesSell === item ? "green" : "#eee" }]}>
                                                    <Text style={{ color: MesSell === item ? "#fff" : '#545454' }}>{getMonthName(item)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />}
                                </>

                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 3, alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                                {Semana.map((e, index) => (
                                    <View key={index} style={{ width: '13%', marginBottom: 5, height: 40, borderRadius: 4, backgroundColor: e === "Dom" ? "#f00" : '#aaa', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {e}
                                        </Text>
                                    </View>
                                ))}
                                {Datas.map((e, index) => (
                                    <TouchableOpacity onPress={() => {
                                        setOpenCalendar(false);
                                        setData(e.click);
                                        onSelectDate && onSelectDate({ pt_br: moment(e.click).format('DD/MM/YYYY'), en: e.click , fulldate:moment(e.click)});
                                        setMesSell(parseInt(e.month_number));
                                        setAnoSell(parseInt(e.year));
                                    }} key={index} style={{ width: '13%', marginBottom: 5, height: 40, borderRadius: 4, backgroundColor: Data === e.click ? 'green' : e.week === "domingo" ? "#f00" : MesSell === e.month_number && AnoSell === e.year ? '#fff' : '#dedede', alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ color: e.week === "domingo" ? "#fff" : Data === e.click ? '#fff' : MesSell === e.month_number && AnoSell === e.year ? '#000' : '#545454' }}>
                                            {e.day}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>}
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 40,
        position: "relative",
    },
    label: {
        marginBottom: 5,
        color: "#a7a7a7",
        marginLeft: 7,
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    suggestionsmoon: {
        position: "absolute",
        width: '49%',
        top: 43, // Altura do campo de entrada + margem superior
        right: 5,
        backgroundColor: "#eee",
        borderRadius: 0,
        maxHeight: 200,
        zIndex: 150,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 0,
            height: 4, // Controla o deslocamento vertical da sombra
        },
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 1
    },
    suggestionsyearn: {
        position: "absolute",
        width: '49%',
        top: 43, // Altura do campo de entrada + margem superior
        left: 5,
        backgroundColor: "#eee",
        borderRadius: 0,
        maxHeight: 200,
        zIndex: 150,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 0,
            height: 4, // Controla o deslocamento vertical da sombra
        },
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 1
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    button: {
        flex: 1,
        height: 40,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: 'center',
        color: "#a7a7a7",
        borderRadius: 5,
        paddingHorizontal: 10,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 0,
            height: 4, // Controla o deslocamento vertical da sombra
        },
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 1
    },
    buttonTitle: {
        color: '#fff'
    },
    ContainercalendarBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.5
    },
    OpenCaledarTrue: {
        width: "100%",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 150
    },
    OpenCaledarFalse: {
        width: "100%",
        zIndex: 150
    },
    calendar: {
        position: "absolute",
        backgroundColor: "#eee",
        width: '90%',
        minHeight: 100,
        borderRadius: 10,
        zIndex: 1,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 0,
            height: 4, // Controla o deslocamento vertical da sombra
        },
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 4, // Raio da sombra
        elevation: 1
    },

});

export default Calendar;
