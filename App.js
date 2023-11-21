import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function PaginaDashboard() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    const buscarPersonagem = async (url) => {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      return dados;
    };

    const buscarTodosPersonagens = async () => {
      const urls = Array.from({ length: 10 }, (_, index) =>
        `https://swapi.dev/api/people/${index + 1}/`
      );

      try {
        const dadosPersonagens = await Promise.all(urls.map(buscarPersonagem));
        setPersonagens(dadosPersonagens);
      } catch (erro) {
        console.error('Erro na busca de personagens:', erro);
      }
    };

    buscarTodosPersonagens();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      {personagens && personagens.length > 0 ? (
        personagens.map((personagem, index) => (
          <Text key={index} style={styles.nome}>
            {personagem.name}
          </Text>
        ))
      ) : (
        <Text style={styles.carregando}>Carregando personagens...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    marginBottom: 10,
  },
  carregando: {
    fontSize: 22,
    marginTop: 20,
  },
});
