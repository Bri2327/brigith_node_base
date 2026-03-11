function validate(schema, target = 'body') {
  return (req, res, next) => {
    const data = req[target]; // body, query, params, etc.

    // Paso 1: Verificar que exista datos
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        message: `El ${target} no puede estar vacío`,
      });
    }

    // Paso 2: Validar contra el schema con opciones
    const {error, value} = schema.validate(data, {
      abortEealy: false, // No detenerse en el primer error, mostrar todos
      stripUnknown: true, // Eliminar campos no definidos en el schema
    });

    // Paso 3: Si hay errores de validación, devolver 400 con mensajes claros
    if (error) {
      return res.status(400).json({
        message: `Error de validación en ${target}`,
        errors: error.details.map((err) => err.message),
      });
    }

    // Paso 4: Reemplazar el objeto oribial con los datos validados y limpios y avanzar
    req[target] = value;

    next();
  }
}

export default validate;