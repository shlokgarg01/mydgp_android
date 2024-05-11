import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';

interface IImageCarousel {
    images: string[];
}

const ImageCarousel = (props: IImageCarousel) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === props?.images?.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, props?.images.length]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {props?.images.map((imageUrl, index) => (
                    <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={[styles.image, { display: index === currentIndex ? 'flex' : 'none' }]}
                        resizeMode="contain"
                    />
                ))}
            </View>
            <View style={styles.paginationContainer}>
                {props?.images.map((_, index) => (
                    <Text key={index} style={[styles.paginationDot, index === currentIndex && styles.activeDot]}>
                        &bull;
                    </Text>
                ))}
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: width - 40,
        height: height - 420,
        margin: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    activeDot: {
        fontWeight: 'bold',
    },
});

export default ImageCarousel;
