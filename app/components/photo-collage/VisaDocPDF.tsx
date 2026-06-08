// app/components/photo-collage/VisaDocPDF.tsx
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
}

interface VisaDocPDFProps {
  title: string;
  photos: PhotoItem[];
  columns: number;
  pageOrientation: 'portrait' | 'landscape';
}

export default function VisaDocPDF({ title, photos, columns, pageOrientation }: VisaDocPDFProps) {
  const gapPercentage = 4;
  const totalGapsSpace = gapPercentage * (columns - 1);
  const calculatedWidth = `${(100 - totalGapsSpace) / columns}%`;

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 24,
      color: '#111827',
      borderBottomWidth: 1.5,
      borderBottomColor: '#111827',
      paddingBottom: 8,
    },
    grid: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: `${gapPercentage}%`,
    },
    card: {
      width: calculatedWidth,
      marginBottom: 20,
      padding: 8,
      borderWidth: 1,
      borderColor: '#f3f4f6',
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    imageWrapper: {
      width: '100%',
      height: 140, 
      backgroundColor: '#f9fafb',
      borderRadius: 4,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    caption: {
      fontSize: 9,
      color: '#374151',
      textAlign: 'center',
      lineHeight: 1.4,
    },
  });

  return (
    <Document>
      <Page size="A4" orientation={pageOrientation} style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.grid}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.card} wrap={false}>
              <View style={styles.imageWrapper}>
                <Image src={photo.src} style={styles.image} />
              </View>
              <Text style={styles.caption}>{photo.caption}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}