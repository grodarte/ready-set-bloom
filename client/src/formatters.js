export function titleCase(str) {
    return str?.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

export function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString("en-US", {
        // weekday: "long",
        month: "long",
        day: "numeric"
    })
}

export function formatEvent(event) {
    return {
        ...event,
        orders: event?.orders?.map(order => formatOrder(order))
    }
}

export function formatOrder(order) {
    return {
        ...order,
        phone: formatPhoneNumber(order.phone),
        event: formatEvent(order.event),
        items: order?.items?.map(item => formatItem(item))
    }
}

export function formatItem(item) {
    return {
        ...item,
        item_type: titleCase(item.item_type),
        item_status: titleCase(item.item_status),
        flower: formatFlower(item.flower),
        ribbon_color: titleCase(item.ribbon_color),
        wristlet: item.wristlet ? formatWristlet(item.wristlet) : null,
        accent: item.accent ? formatAccent(item.accent) : null
    }
}

export function formatFlower(flower) {
    return {
        ...flower,
        color: titleCase(flower?.color),
        name: titleCase(flower?.name)
    }
}

export function formatWristlet(wristlet) {
    return {
        ...wristlet,
        color: titleCase(wristlet?.color),
        style: titleCase(wristlet?.style)
    }
}

export function formatAccent(accent) {
    return {
        ...accent,
        color: titleCase(accent?.color)
    }
}

export function formatPhoneNumber(phone) {
    if (!phone || phone.length !== 10) return phone

    return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`
}