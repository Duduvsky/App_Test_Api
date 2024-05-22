// ProductList.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, Modal, TouchableOpacity } from "react-native";
import axios from "axios";

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get("http://172.27.32.1:3000/produtos")
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter produtos:", error);
      });
  }, []);

  const buscarProdutoPorId = (id) => {
    axios.get(`http://172.27.32.1:3000/produtos/${id}`)
      .then(response => {
        setProdutoSelecionado(response.data);
        setModalVisible(true);
      })
      .catch(error => {
        console.error("Erro ao obter produto por ID:", error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nome}</Text>
      <Text>{item.descricao}</Text>
      <Text>R$ {item.preco.toFixed(2)}</Text>
      <TouchableOpacity onPress={() => buscarProdutoPorId(item.id)}>
        <Text style={styles.verDetalhes}>Ver detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {produtoSelecionado && (
              <View>
                <Text style={styles.modalTitle}>{produtoSelecionado.nome}</Text>
                <Text>{produtoSelecionado.descricao}</Text>
                <Text>R$ {produtoSelecionado.preco.toFixed(2)}</Text>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  verDetalhes: {
    color: "blue",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProductList;
