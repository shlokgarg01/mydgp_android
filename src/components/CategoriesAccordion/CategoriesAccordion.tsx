import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from './CategoriesAccordion.styles';

interface Service {
    id: number;
    name: string;
    subServices: string[];
}

interface Props {
    services: Service[];
    onServicesSelect: (selectedServices: string[], selectedSubServices: string[]) => void;
}

const CategoriesAccordion: React.FC<Props> = ({ services, onServicesSelect }) => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);

    useEffect(() => {
        // When selectedServices change, automatically select sub-services of the selected services
        const subServices: string[] = services
            .filter((service) => selectedServices.includes(service.name))
            .flatMap((service) => service.subServices);

        setSelectedSubServices(subServices);
    }, [selectedServices]);

    const toggleServiceSelection = (service: string) => {
        const updatedSelection = selectedServices.includes(service)
            ? selectedServices.filter((selected) => selected !== service)
            : [...selectedServices, service];
        setSelectedServices(updatedSelection);
    };

    const toggleSubServiceSelection = (subService: string) => {
        const updatedSelection = selectedSubServices.includes(subService)
            ? selectedSubServices.filter((selected) => selected !== subService)
            : [...selectedSubServices, subService];
        setSelectedSubServices(updatedSelection);
    };

    return (
        <View style={styles.parentContainer}>
            <Text style={styles.heading}>Select services:</Text>
            <FlatList
                data={services}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <CheckBox
                            title={item.name}
                            checked={selectedServices.includes(item.name)}
                            onPress={() => toggleServiceSelection(item.name)}
                        />
                        {selectedServices.includes(item.name) &&
                            <FlatList
                                data={item?.subServices}
                                renderItem={({ item: subService }) => (
                                    <CheckBox
                                        key={subService}
                                        title={subService}
                                        checked={selectedSubServices.includes(subService)}
                                        onPress={() => toggleSubServiceSelection(subService)}
                                        containerStyle={styles.subCategoryCheckboxContainer}
                                    />
                                )}
                                keyExtractor={(subService) => subService}
                            />
                        }
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
                onPress={() => onServicesSelect(selectedServices, selectedSubServices)}
                style={styles.submitButton} >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CategoriesAccordion;
