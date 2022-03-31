export default class FotoService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  lista() {
    return this._resource.query().then(
      res => res.json(),
      err => {
        console.log(err);
        throw new Error("Não foi possível obter as fotos");
      }
    );
  }

  cadastra(foto) {
    if (foto._id) {
      return this._resource.update({ id: foto._id }, foto);
    } else {
      return this._resource.save(foto);
    }
  }

  apaga(id) {
    // this.resource.delete({id: id}) // como a chave e o id é o mesmo pode simplificar como está abaixo
    return this._resource.delete({ id }).then(null, err => {
      console.log(err);
      throw new Error("Não foi possível remover a foto");
    });
  }

  busca(id) {
    return this._resource.get({ id }).then(res => res.json());
  }
}
