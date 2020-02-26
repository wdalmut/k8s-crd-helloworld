const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

const informer = k8s.makeInformer(kc, '/apis/app.corley.it/v1/pizzas', () => {
  return k8sApi.listClusterCustomObject('app.corley.it', 'v1', 'pizzas')
})

informer.on('add', obj => console.log(JSON.stringify(obj, null, 2)))
informer.on('update', obj => console.log(JSON.stringify(obj, null, 2)))
informer.on('delete', obj => console.log(JSON.stringify(obj, null, 2)))

informer.start()

