<template>
    <v-timeline-item>
                            <span slot="opposite">{{dataMember}}</span>
                                <!-- <v-card>
                                <v-card-title>
                                    <span>{{item.nombre}} {{item.apellido_paterno}}</span>
                                    <v-spacer></v-spacer>				
                                </v-card-title>
                                <v-divider></v-divider>
                                    <v-btn color="primary" @click="view(item,item.key, item.direccion, item.supervivencia )" dark>ver mas</v-btn>
                            </v-card> -->
                        </v-timeline-item>
</template>
<script>
export default {
    name:'memberFamily',
    props:  ['dataMember']
}
</script>
