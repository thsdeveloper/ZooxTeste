import http from "../http-common";

class CidadeService {
    getAll() {
        return http.get("/cidades");
    }

    get(id) {
        return http.get(`/cidades/${id}`);
    }

    create(data) {
        return http.post("/cidades", data);
    }

    update(id, data) {
        return http.put(`/cidades/${id}`, data);
    }

    delete(id) {
        return http.delete(`/cidades/${id}`);
    }

    deleteAll() {
        return http.delete(`/cidades`);
    }

    findByTitle(nome) {
        return http.get(`/cidades?nome=${nome}`);
    }

}

export default new CidadeService();