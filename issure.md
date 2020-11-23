i am not sure if this can help you:

in the package code, 

https://github.com/element-plus/element-plus/blob/41655b6847f23525ad6ceb2fff98cb146df5f32c/packages/pagination/src/index.ts#L128

'internalCurrentPage.value' has the watchEffect function to emit 'update:currentPage'

but nowhere to emit 'update:pageSize'