import http from "../http-common";

class EstadoService {
    getAll() {
        return http.get("/estados");
    }

    get(id) {
        return http.get(`/estados/${id}`);
    }

    create(data) {
        return http.post("/estados", data);
    }

    update(id, data) {
        return http.put(`/estados/${id}`, data);
    }

    delete(id) {
        return http.delete(`/estados/${id}`);
    }

    deleteAll() {
        return http.delete(`/estados`);
    }

    findByTitle(nome) {
        return http.get(`/estados?nome=${nome}`);
    }

}

export default new EstadoService();