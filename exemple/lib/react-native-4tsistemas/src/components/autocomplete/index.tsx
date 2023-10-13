//       ##   ######             ####     ####     ####    ######   ######   ##   ##    ##      ####
//      ###     ##              ##  ##     ##     ##  ##     ##     ##       ### ###   ####    ##  ##
//     ####     ##              ##         ##     ##         ##     ##       #######  ##  ##   ##
//   ##  ##     ##               ####      ##      ####      ##     ####     ## # ##  ######    ####
//   #######    ##                  ##     ##         ##     ##     ##       ##   ##  ##  ##       ##
//       ##     ##              ##  ##     ##     ##  ##     ##     ##       ##   ##  ##  ##   ##  ##
//       ##     ##               ####     ####     ####      ##     ######   ##   ##  ##  ##    ####

import React, { useEffect, useState, useRef, ReactElement } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    ViewStyle
} from "react-native";

interface Props {
    label?: string;
    data?: any[];
    onChangeText?: (e: string) => void;
    onClear?: () => void;
    valueSelect?: any | null;
    onSelect?: (e: any) => void;
    disable?: boolean;
    placeholder?: string;
    ContainerStyle?: ViewStyle,
    ContainerInputStyle?: ViewStyle,
    RenderIcon?: ReactElement,
    IconStyle?: ViewStyle,
    LabelStyle?: ViewStyle,
    placeholderTextColor?: string,
    RenderItem?: (item: any, index: number) => ReactElement,
    ItemSearch?: any[],
    ItemValue?: any[],
}

const AutoComplete: React.FC<Props> = ({
    label,
    data,
    onChangeText,
    valueSelect,
    onClear,
    onSelect,
    disable,
    placeholder,
    ContainerStyle,
    ContainerInputStyle,
    RenderIcon,
    IconStyle,
    LabelStyle,
    placeholderTextColor,
    RenderItem,
    ItemSearch,
    ItemValue
}) => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<TextInput | null>(null);

    useEffect(() => {
        try {
            if (query) {
                if (ItemSearch) {
                    switch (ItemSearch.length) {
                        case 1:
                            const filteredSuggestions1 = data?.filter((item) =>
                                item[ItemSearch[0]].toLowerCase()
                                    .includes(query.toLowerCase())
                            );
                            setSuggestions(filteredSuggestions1 || []);
                            break;
                        case 2:
                            const filteredSuggestions2 = data?.filter((item) =>
                                `${item[ItemSearch[0]]}${item[ItemSearch[1]]}`.toLowerCase()
                                    .includes(query.toLowerCase())
                            );
                            setSuggestions(filteredSuggestions2 || []);
                            break;
                        case 3:
                            const filteredSuggestions3 = data?.filter((item) =>
                                `${item[ItemSearch[0]]}${item[ItemSearch[1]]}${item[ItemSearch[2]]}`.toLowerCase()
                                    .includes(query.toLowerCase())
                            );
                            setSuggestions(filteredSuggestions3 || []);
                            break;
                    };
                } else {
                    const filteredSuggestions = data?.filter((item) =>
                        item.toLowerCase()
                            .includes(query.toLowerCase())
                    );
                    setSuggestions(filteredSuggestions || []);
                };
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {

        }
    }, [query, data, valueSelect]);

    const handleSuggestionSelect = (item: any) => {
        if (ItemValue) {
            switch (ItemValue.length) {
                case 1:
                    setQuery(item[ItemValue[0]]);
                    break;
                case 2:
                    setQuery(`${item[ItemValue[0]]} - ${item[ItemValue[1]]}`);
                    break;
                case 3:
                    setQuery(`${item[ItemValue[0]]} - ${item[ItemValue[1]]} - ${item[ItemValue[2]]}`);
                    break;
            };
        } else {
            if (ItemSearch) {
                setQuery(item[ItemSearch[0]]);
            } else {
                setQuery(item);
            };
        };
        setShowSuggestions(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    const handleOutsideClick = () => {
        Keyboard.dismiss();
        // setShowSuggestions(false);
    };

    const handleClearInput = () => {
        setQuery("");
        if (onChangeText) {
            onChangeText("");
        }
    };

    useEffect(() => {
        if (valueSelect) {
            const selectedItem = data?.find((item) => {
                if (ItemSearch) {
                    switch (ItemSearch.length) {
                        case 1:
                            return item[ItemSearch[0]] === valueSelect[ItemSearch[0]]
                        case 2:
                            return item[ItemSearch[0]] === valueSelect[ItemSearch[0]] && item[ItemSearch[1]] === valueSelect[ItemSearch[1]]
                        case 3:
                            return item[ItemSearch[0]] === valueSelect[ItemSearch[0]] && item[ItemSearch[1]] === valueSelect[ItemSearch[1]] && item[ItemSearch[2]] === valueSelect[ItemSearch[2]]
                    };
                } else {
                    return item === valueSelect
                };
            });
            if (selectedItem) {
                if (ItemValue) {
                    switch (ItemValue.length) {
                        case 1:
                            setQuery(selectedItem[ItemValue[0]]);
                            break;
                        case 2:
                            setQuery(`${selectedItem[ItemValue[0]]} - ${selectedItem[ItemValue[1]]}`);
                            break;
                        case 3:
                            setQuery(`${selectedItem[ItemValue[0]]} - ${selectedItem[ItemValue[1]]} - ${selectedItem[ItemValue[2]]}`);
                            break;
                    };
                } else {
                    if (ItemSearch) {
                        setQuery(selectedItem[ItemSearch[0]]);
                    } else {
                        setQuery(selectedItem);
                    };
                };
            }else{
                setQuery("");
            };
        } else {
            setQuery("");
        }
    }, [valueSelect, data]);

    return (
        <View style={{ width: "100%", zIndex: 150 }}>
            <TouchableWithoutFeedback style={{ zIndex: 150 }} onPress={handleOutsideClick}>
                <View style={[styles.container, ContainerStyle]}>
                    {label && <Text style={[styles.label, LabelStyle]}>{label}</Text>}
                    <View style={styles.inputContainer}>
                        <TextInput
                            editable={!disable}
                            ref={inputRef}
                            style={[styles.input, ContainerInputStyle]}
                            placeholder={placeholder ? placeholder : "Digite algo"}
                            placeholderTextColor={placeholderTextColor ? placeholderTextColor : "#a7a7a7"}
                            value={query}
                            onChangeText={(text) => {
                                setQuery(text);
                                setShowSuggestions(true);
                                if (onChangeText) {
                                    onChangeText(text);
                                }
                            }}
                            onFocus={() => setShowSuggestions(true)}

                        />
                        {query.length > 0 && (
                            <TouchableOpacity onPressIn={onClear} onPress={handleClearInput} style={styles.clearButton}>
                                {RenderIcon ? RenderIcon : <Text style={[styles.icon, IconStyle]}>X</Text>}
                            </TouchableOpacity>
                        )}
                    </View>
                    {showSuggestions && suggestions.length > 0 && (
                        <FlatList
                            style={styles.suggestions}
                            data={suggestions}
                            renderItem={({ item, index }) => (
                                RenderItem ? RenderItem(item, index) :
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            handleOutsideClick();
                                            handleSuggestionSelect(item);
                                        }}
                                    >
                                        <View style={styles.suggestionItem}>
                                            <Text style={{ color: '#545454' }}>{ItemSearch ? ItemSearch.length > 0 ? item[ItemSearch[0]] : item : item}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:10
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "#fff",
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
    icon: {
        color: 'red',
        fontWeight: 'bold'
    },
    clearButton: {
        paddingHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10
    },
    suggestions: {
        position: "absolute",
        top: 50, // Altura do campo de entrada + margem superior
        left: 0,
        right: 0,
        backgroundColor: "#eee",
        borderRadius: 5,
        maxHeight: 200,
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
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default AutoComplete;
