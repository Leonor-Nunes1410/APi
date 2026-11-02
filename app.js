const API_URL = "http://localhost:5004";

// 1. Função para calcular o IVA
window.calcularIVA = async function () {
    const elInput = document.getElementById("valorBase");
    const divResultado = document.getElementById("resultadoIVA");

    const valor = elInput ? elInput["value"] : "";
    if (!valor || !divResultado) return;

    try {
        const res = await fetch(`${API_URL}/api/calculo-iva?valorBase=${valor}`);
        const dados = await res.json();
        divResultado.innerHTML = `Total: <strong>${dados["total"]} €</strong> (Base: ${dados["base"]} € | IVA: ${dados["iva"]} €)`;
    } catch (err) {
        divResultado.innerText = "Erro ao calcular IVA. Verifica se a API está a correr.";
    }
};

// 2. Função para guardar um novo cliente
window.guardarCliente = async function () {
    const elNome = document.getElementById("nomeCliente");
    const elNif = document.getElementById("nifCliente");
    const divResultado = document.getElementById("resultadoGuardar");

    const nome = elNome ? elNome["value"] : "";
    const nif = elNif ? elNif["value"] : "";

    if (!nome || !nif || !divResultado) return;

    try {
        const res = await fetch(`${API_URL}/api/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nome, nif: nif })
        });

        const msg = await res.text();
        divResultado.innerText = msg;

        // Limpa os campos de texto após guardar
        elNome["value"] = "";
        elNif["value"] = "";

        // Atualiza a lista automaticamente
        window.carregarClientes();
    } catch (err) {
        divResultado.innerText = "Erro ao guardar cliente.";
    }
};

// 3. Função para carregar e listar os clientes da base de dados
window.carregarClientes = async function () {
    const divLista = document.getElementById("conteudoLista");
    if (!divLista) return;

    try {
        const res = await fetch(`${API_URL}/api/clientes`);
        const clientes = await res.json();

        let html = "";
        for (let i = 0; i < clientes.length; i++) {
            const item = clientes[i];
            html += `<div class="cliente-item">Nome: ${item["nome"]} | NIF: ${item["nif"]}</div>`;
        }

        divLista.innerHTML = html;
    } catch (err) {
        divLista.innerText = "Erro ao carregar lista de clientes.";
    }
};

// Carrega a lista de clientes automaticamente ao abrir a página
window.carregarClientes();