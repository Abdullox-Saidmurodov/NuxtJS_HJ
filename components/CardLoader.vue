<template>
    <Card>
        <CardContent class="p-0">
            <div class="grid gap-4 p-4 pt-4 w-full">
                <div class="overflow-hidden rounded-md relative">
                    <Skeleton class="h-[170px] transition-all hover:scale-105 bg-foreground-muted" />
                    <div class="flex flex-col space-y-2 absolute top-2 right-2">
                        <Skeleton class="size-0 rounded-full" />
                        <Skeleton class="size-0 rounded-full" />
                    </div>
                </div>
                <Skeleton class="h-4 w-[90%] bg-foreground/20" />
                <Skeleton class="h-4 w-[90%] bg-foreground/20" />
            </div>
        </CardContent>
        <CardFooter class="border-t p-4 pt-4 w-full justify-between">
            <Skeleton class="h-4 w-[200px] bg-foreground/20"></Skeleton>
        </CardFooter>
    </Card>
</template>