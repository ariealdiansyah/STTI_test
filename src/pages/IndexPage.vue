<template>
  <q-page class="q-pa-lg">
    <div class="q-col-gutter-x-md q-mt-md">
      <div class="row items-center q-mb-sm">
        <div class="col-md-6">
          <div class="row">
            <div class="col-4">
              <span>Nama</span>
            </div>
            <div class="col-8">
              <span class="custom-input-32">
                <q-input outlined hide-bottom-space v-model="nama" dense />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center q-mb-sm">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-4">
              <span>Phone</span>
            </div>
            <div class="col-md-8">
              <span class="custom-input-32">
                <q-input
                  class="col-md-4"
                  hide-bottom-space
                  outlined
                  v-model="phone"
                  dense
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center q-mb-sm">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-4">
              <span>Address</span>
            </div>
            <div class="col-md-8">
              <span class="custom-input-32">
                <q-input
                  class="col-md-4"
                  hide-bottom-space
                  outlined
                  v-model="address"
                  dense
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row items-center q-mb-sm">
        <div class="col-md-6">
          <div class="row text-right justify-end">
            <q-btn color="primary" label="Tambah Data" @click="addData" />
          </div>
        </div>
      </div>
    </div>
    <div class="q-col-gutter-x-lg">
      <q-table
        title="Data"
        :rows="datas"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :filter-method="myFilter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable vue/return-in-computed-property */
import { defineComponent, computed, ref, onMounted } from 'vue';
import { useStore, mapGetters } from 'vuex';
const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Nama',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'phone',
    align: 'left',
    label: 'Phone',
    field: 'phone',
    sortable: true,
  },
  {
    name: 'address',
    required: true,
    label: 'Address',
    align: 'left',
    field: 'address',
    sortable: true,
  },
];

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const store = useStore();
    const filter = ref('');
    const nama = ref('');
    const phone = ref('');
    const address = ref('');

    const myFilter = (rows, terms) => {
      return rows.filter(
        (x) =>
          x.name.toLowerCase().includes(terms.toLowerCase()) ||
          x.phone.toLowerCase().includes(terms.toLowerCase()) ||
          x.address.toLowerCase().includes(terms.toLowerCase())
      );
    };

    const addData = () => {
      store.commit('data/addData', {
        name: nama.value,
        phone: phone.value,
        address: address.value,
      });
      nama.value = '';
      phone.value = '';
      address.value = '';
    };

    onMounted(() => {
      store.commit('data/clear');
    });

    return {
      address,
      phone,
      nama,
      columns,
      filter,
      myFilter,
      addData,
    };
  },
  computed: {
    ...mapGetters('data', {
      datas: 'getListData',
    }),
  },
});
</script>
